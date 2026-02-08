package com.catchMind.user.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UserDto {

  private Long userId;        // 유저 ID
  private String loginId;     // 로그인 ID
  private String nickname;    // 닉네임
  private String email;       // 이메일
  private String password;    // 패스워드 (암호화)
  private Role role;          // 권한
  private LocalDateTime createdAt; // 가입일

  // 권한 ENUM
  public enum Role {
      USER,
      ADMIN
  }

}
