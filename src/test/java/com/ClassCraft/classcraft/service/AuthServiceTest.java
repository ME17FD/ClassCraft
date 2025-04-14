package com.ClassCraft.classcraft.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ClassCraft.classcraft.dto.LoginRequest;
import com.ClassCraft.classcraft.dto.SignupRequest;
import com.ClassCraft.classcraft.model.ERole;
import com.ClassCraft.classcraft.model.User;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    private User testUser;
    private final String encodedPassword = "$2a$10$encodedPasswordHash";

    @BeforeEach
    void setUp() {
        testUser = new User(
            "testuser",
            "test@example.com",
            encodedPassword,
            Set.of(ERole.ROLE_STUDENT)
        );
    }

    @Test
    void login_WithValidCredentials_ReturnsUser() {
        LoginRequest request = new LoginRequest();
        request.setUsername("testuser");
        request.setPassword("correctPassword");
        
        when(userService.findUserByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("correctPassword", encodedPassword)).thenReturn(true);

        User result = authService.login(request);

        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
        verify(userService).findUserByUsername("testuser");
        verify(passwordEncoder).matches("correctPassword", encodedPassword);
    }

    @Test
    void login_WithInvalidUsername_ThrowsException() {
        LoginRequest request = new LoginRequest();
        request.setUsername("nonexistent");
        request.setPassword("anyPassword");
        
        when(userService.findUserByUsername("nonexistent")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, 
            () -> authService.login(request));
        assertEquals("Invalid credentials", exception.getMessage());
        verify(userService).findUserByUsername("nonexistent");
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    void login_WithInvalidPassword_ThrowsException() {
        LoginRequest request = new LoginRequest();
        request.setUsername("testuser");
        request.setPassword("wrongPassword");
        
        when(userService.findUserByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("wrongPassword", encodedPassword)).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class, 
            () -> authService.login(request));
        assertEquals("Invalid credentials", exception.getMessage());
        verify(passwordEncoder).matches("wrongPassword", encodedPassword);
    }

    @Test
    void register_WithNewUser_ReturnsCreatedUserWithRoles() {
        SignupRequest request = new SignupRequest();
        request.setUsername("newuser");
        request.setEmail("new@example.com");
        request.setPassword("password123");
        request.setRoles(Set.of(ERole.ROLE_STUDENT));

        when(userService.existsByUsername("newuser")).thenReturn(false);
        when(userService.existsByEmail("new@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn(encodedPassword);
        
        ArgumentCaptor<Set<ERole>> rolesCaptor = ArgumentCaptor.forClass(Set.class);
        when(userService.registerUser(
            eq("newuser"),
            eq("new@example.com"),
            eq(encodedPassword),
            rolesCaptor.capture()
        )).thenReturn(testUser);

        User result = authService.register(request);

        assertNotNull(result);
        Set<ERole> capturedRoles = rolesCaptor.getValue();
        assertEquals(1, capturedRoles.size());
        assertTrue(capturedRoles.contains(ERole.ROLE_STUDENT));
    }

    @Test
    void register_WithMultipleRoles_PersistsAllRoles() {
        SignupRequest request = new SignupRequest();
        request.setUsername("multirole");
        request.setEmail("multirole@test.com");
        request.setPassword("password123");
        request.setRoles(Set.of(ERole.ROLE_STUDENT, ERole.ROLE_PROFESSOR));

        when(userService.existsByUsername("multirole")).thenReturn(false);
        when(userService.existsByEmail("multirole@test.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn(encodedPassword);
        
        ArgumentCaptor<Set<ERole>> rolesCaptor = ArgumentCaptor.forClass(Set.class);
        when(userService.registerUser(
            eq("multirole"),
            eq("multirole@test.com"),
            eq(encodedPassword),
            rolesCaptor.capture()
        )).thenReturn(testUser);

        User result = authService.register(request);

        assertNotNull(result);
        Set<ERole> capturedRoles = rolesCaptor.getValue();
        assertEquals(2, capturedRoles.size());
        assertTrue(capturedRoles.contains(ERole.ROLE_STUDENT));
        assertTrue(capturedRoles.contains(ERole.ROLE_PROFESSOR));
    }

    @Test
    void register_WithNoRoles_DefaultsToStudentRole() {
        SignupRequest request = new SignupRequest();
        request.setUsername("defaultrole");
        request.setEmail("default@example.com");
        request.setPassword("password123");
        request.setRoles(new HashSet<>());

        when(userService.existsByUsername("defaultrole")).thenReturn(false);
        when(userService.existsByEmail("default@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn(encodedPassword);
        
        ArgumentCaptor<Set<ERole>> rolesCaptor = ArgumentCaptor.forClass(Set.class);
        when(userService.registerUser(
            eq("defaultrole"),
            eq("default@example.com"),
            eq(encodedPassword),
            rolesCaptor.capture()
        )).thenReturn(testUser);

        User result = authService.register(request);

        assertNotNull(result);
        Set<ERole> capturedRoles = rolesCaptor.getValue();
        assertEquals(1, capturedRoles.size());
        assertTrue(capturedRoles.contains(ERole.ROLE_STUDENT));
    }

    @Test
    void register_WithExistingUsername_ThrowsException() {
        SignupRequest request = new SignupRequest();
        request.setUsername("existingUser");
        request.setEmail("new@example.com");
        request.setPassword("password123");
        request.setRoles(Set.of(ERole.ROLE_STUDENT));

        when(userService.existsByUsername("existingUser")).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class, 
            () -> authService.register(request));
        assertEquals("Username already taken", exception.getMessage());
        verify(userService).existsByUsername("existingUser");
        verify(userService, never()).existsByEmail(anyString());
        verify(userService, never()).registerUser(any(), any(), any(), any());
    }

    @Test
    void register_WithExistingEmail_ThrowsException() {
        SignupRequest request = new SignupRequest();
        request.setUsername("newuser");
        request.setEmail("existing@example.com");
        request.setPassword("password123");
        request.setRoles(Set.of(ERole.ROLE_STUDENT));

        when(userService.existsByUsername("newuser")).thenReturn(false);
        when(userService.existsByEmail("existing@example.com")).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class, 
            () -> authService.register(request));
        assertEquals("Email already registered", exception.getMessage());
        verify(userService).existsByEmail("existing@example.com");
        verify(userService, never()).registerUser(any(), any(), any(), any());
    }

    @Test
    void getAllUsers_ReturnsUserList() {
        when(userService.getAllUsers()).thenReturn(List.of(testUser));

        List<User> result = authService.getAllUsers();

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("testuser", result.get(0).getUsername());
    }
}