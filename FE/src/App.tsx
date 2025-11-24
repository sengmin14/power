import { useState, useEffect } from 'react'
import './App.css'

interface Employee {
  id: number
  name: string
  position: string
}

const API_BASE_URL = 'http://localhost:8080/api/employees'

function App() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', position: '' })

  // 직원 목록 조회
  const fetchEmployees = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_BASE_URL)
      if (!response.ok) {
        throw new Error('직원 목록을 불러오는데 실패했습니다.')
      }
      const data = await response.json()
      setEmployees(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 직원 등록
  const addEmployee = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.position.trim()) {
      setError('이름과 직책을 모두 입력해주세요.')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('직원 등록에 실패했습니다.')
      }

      const newEmployee = await response.json()
      setEmployees([...employees, newEmployee])
      setFormData({ name: '', position: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 직원 삭제
  const deleteEmployee = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) {
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('직원 삭제에 실패했습니다.')
      }

      setEmployees(employees.filter(emp => emp.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 컴포넌트 마운트 시 직원 목록 조회
  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>직원 관리 시스템</h1>
        <p>직원 정보를 조회, 등록, 삭제할 수 있습니다.</p>
      </header>

      <main className="app-main">
        {/* 직원 등록 폼 */}
        <section className="form-section">
          <h2>새 직원 등록</h2>
          <form onSubmit={addEmployee} className="employee-form">
            <div className="form-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="직원 이름을 입력하세요"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="position">직책</label>
              <input
                type="text"
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="직책을 입력하세요"
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '처리 중...' : '등록'}
            </button>
          </form>
        </section>

        {/* 에러 메시지 */}
        {error && (
          <div className="error-message">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* 직원 목록 */}
        <section className="list-section">
          <div className="section-header">
            <h2>직원 목록</h2>
            <button onClick={fetchEmployees} className="btn btn-secondary" disabled={loading}>
              새로고침
            </button>
          </div>

          {loading && employees.length === 0 ? (
            <div className="loading">로딩 중...</div>
          ) : employees.length === 0 ? (
            <div className="empty-state">
              <p>등록된 직원이 없습니다.</p>
            </div>
          ) : (
            <div className="employee-list">
              {employees.map((employee) => (
                <div key={employee.id} className="employee-card">
                  <div className="employee-info">
                    <h3>{employee.name}</h3>
                    <p className="position">{employee.position}</p>
                    <span className="employee-id">ID: {employee.id}</span>
                  </div>
                  <button
                    onClick={() => deleteEmployee(employee.id)}
                    className="btn btn-danger"
                    disabled={loading}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
