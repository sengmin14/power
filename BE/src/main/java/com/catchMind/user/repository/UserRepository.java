package com.catchMind.user.repository;

import com.catchMind.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // 로그인 ID로 사용자 찾기
    Optional<User> findByLoginId(String loginId);
    
    // 닉네임으로 사용자 찾기
    Optional<User> findByNickname(String nickname);
    
    // 로그인 ID 존재 여부 확인
    boolean existsByLoginId(String loginId);
    
    // 닉네임 존재 여부 확인
    boolean existsByNickname(String nickname);
}


