package com.catchMind.user.controller;

import com.catchMind.user.dto.UserDto;
import com.catchMind.user.service.UserService;
import com.utils.TokenUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    /**
     * 회원가입
     * POST /users/auth/signup
     */
    @PostMapping("/auth/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody UserDto signupDto) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            UserDto userDto = userService.signup(signupDto);
            
            response.put("success", true);
            response.put("message", "회원가입이 완료되었습니다.");
            response.put("data", userDto);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            log.error("회원가입 오류", e);
            response.put("success", false);
            response.put("message", "회원가입 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * 로그인
     * POST /users/auth/login
     * 임시 주석
     */
    @PostMapping("/auth/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody Map<String, String> loginRequest,
            HttpServletResponse httpResponse) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String loginId = loginRequest.get("loginId");
            String password = loginRequest.get("password");
            
            if (loginId == null || password == null) {
                response.put("success", false);
                response.put("message", "로그인 ID와 비밀번호를 입력해주세요.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            
            UserDto userDto = userService.login(loginId, password);
            
            // JWT 토큰 생성
            String accessToken = TokenUtils.generateJwt(userDto);
            String refreshToken = TokenUtils.generateRefreshToken(userDto);
            
            // HttpOnly Cookie로 AccessToken 설정
            Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
            accessTokenCookie.setHttpOnly(true);  // JavaScript 접근 불가 (XSS 방지)
            accessTokenCookie.setSecure(false);   // 개발 환경: false, 프로덕션: true (HTTPS)
            accessTokenCookie.setPath("/");
            accessTokenCookie.setMaxAge(3600);    // 1시간 (초 단위)
            httpResponse.addCookie(accessTokenCookie);
            
            // HttpOnly Cookie로 RefreshToken 설정
            Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setSecure(false);  // 개발 환경: false, 프로덕션: true
            refreshTokenCookie.setPath("/");
            refreshTokenCookie.setMaxAge(1209600); // 14일 (초 단위)
            httpResponse.addCookie(refreshTokenCookie);
            
            response.put("success", true);
            response.put("message", "로그인에 성공했습니다.");
            response.put("user", userDto);
            // 보안을 위해 응답 본문에는 토큰 포함하지 않음
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception e) {
            log.error("로그인 오류", e);
            response.put("success", false);
            response.put("message", "로그인 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * 로그인 ID 중복 확인
     * GET /users/checkLoginId?loginId=xxx
     */
    @GetMapping("/checkLoginId")
    public ResponseEntity<Map<String, Object>> checkLoginId(@RequestParam("loginId") String loginId) {
        Map<String, Object> response = new HashMap<>();
        
        boolean exists = userService.checkLoginId(loginId);
        
        response.put("exists", exists);
        response.put("message", exists ? "이미 사용 중인 로그인 ID입니다." : "사용 가능한 로그인 ID입니다.");
        
        return ResponseEntity.ok(response);
    }

    /**
     * 닉네임 중복 확인
     * GET /users/checkNickname?nickname=xxx
     */
    @GetMapping("/checkNickname")
    public ResponseEntity<Map<String, Object>> checkNickname(@RequestParam("nickname") String nickname) {
        Map<String, Object> response = new HashMap<>();
        
        boolean exists = userService.checkNickname(nickname);
        
        response.put("exists", exists);
        response.put("message", exists ? "이미 사용 중인 닉네임입니다." : "사용 가능한 닉네임입니다.");
        
        return ResponseEntity.ok(response);
    }

    /**
     * 로그아웃
     * POST /users/auth/logout
     */
    @PostMapping("/auth/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpServletResponse httpResponse) {
        Map<String, Object> response = new HashMap<>();
        
        // AccessToken Cookie 삭제
        Cookie accessTokenCookie = new Cookie("accessToken", null);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(false);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(0);  // 즉시 삭제
        httpResponse.addCookie(accessTokenCookie);
        
        // RefreshToken Cookie 삭제
        Cookie refreshTokenCookie = new Cookie("refreshToken", null);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(false);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(0);  // 즉시 삭제
        httpResponse.addCookie(refreshTokenCookie);
        
        response.put("success", true);
        response.put("message", "로그아웃되었습니다.");
        
        return ResponseEntity.ok(response);
    }

    /**
     * 현재 사용자 확인
     * GET /users/auth/me
     */
    @PostMapping("/auth/me")
    public ResponseEntity<Map<String, Object>> me(HttpServletResponse httpResponse) {
        Map<String, Object> response = new HashMap<>();
        
        // accessToken 나중에 TokenUtils로 옮겨서 상수 관리해보자
        String tokenName = "accessToken";

        // accessToken 추출
        String accessToken = TokenUtils.getTokenFromCookie(httpResponse, tokenName);

        // 토큰 존재 여부 확인
        if (accessToken == null) {
            response.put("success", false);
            response.put("message", "토큰이 존재하지 않습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // 토큰 유효성 검사
        ValidTokenDto tokenStatus = TokenUtils.isValidToken(accessToken);
        if (!tokenStatus.isValid()) {
            response.put("success", false);
            response.put("message", "토큰이 유효하지 않습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // accessToken으로 UserDto 생성
        Claims claims = getTokenToClaims(accessToken);
        UserDto userDto = new UserDto();
        userDto.setUserId(Long.parseLong(claims.get("userId").toString()));
        userDto.setLoginId(claims.get("loginId").toString());
        userDto.setNickname(claims.get("nickname").toString());
        userDto.setEmail(claims.get("email").toString());
        userDto.setRole(UserDto.Role.valueOf(claims.get("role").toString()));
        userDto.setCreatedAt(LocalDateTime.parse(claims.get("createdAt").toString()));

        response.put("success", true);
        response.put("message", "확인된 사용자입니다.");
        response.put("user", userDto);

        ResponseEntity.ok(response);
    }
}


