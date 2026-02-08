package com.catchMind.user.entity;

import com.catchMind.user.dto.UserDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "users", schema = "catch_mind")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "login_id", unique = true, nullable = false, length = 50)
    private String loginId;

    @Column(name = "nickname", unique = true, nullable = false, length = 50)
    private String nickname;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserDto.Role role;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (role == null) {
            role = UserDto.Role.USER;
        }
    }

    // UserDto로 변환
    public UserDto toDto() {
        UserDto dto = new UserDto();
        dto.setUserId(this.userId);
        dto.setLoginId(this.loginId);
        dto.setNickname(this.nickname);
        dto.setEmail(this.email);
        dto.setPassword(this.password);
        dto.setRole(this.role);
        dto.setCreatedAt(this.createdAt);
        return dto;
    }
}


