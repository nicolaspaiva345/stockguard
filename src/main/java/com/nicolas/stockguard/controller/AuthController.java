package com.nicolas.stockguard.controller;

import com.nicolas.stockguard.dto.LoginRequest;
import com.nicolas.stockguard.dto.LoginResponse;
import com.nicolas.stockguard.dto.UserRequest;
import com.nicolas.stockguard.dto.UserResponse;
import com.nicolas.stockguard.service.AuthService;
import com.nicolas.stockguard.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    public AuthController(
            UserService userService,
            AuthService authService
    ) {
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody @Valid UserRequest request) {
        return userService.create(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid LoginRequest request) {
        return authService.login(request);
    }

}