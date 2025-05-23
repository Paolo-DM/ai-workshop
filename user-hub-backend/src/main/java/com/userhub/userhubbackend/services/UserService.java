package com.userhub.userhubbackend.services;

import com.userhub.userhubbackend.entities.Permission;
import com.userhub.userhubbackend.entities.User;
import com.userhub.userhubbackend.repositories.PermissionRepository;
import com.userhub.userhubbackend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PermissionRepository permissionRepository;
    private final UserUpdateNotifierService userUpdateNotifierService;

    @Autowired
    public UserService(UserRepository userRepository,
                       PermissionRepository permissionRepository,
                       UserUpdateNotifierService userUpdateNotifierService) {
        this.userRepository = userRepository;
        this.permissionRepository = permissionRepository;
        this.userUpdateNotifierService = userUpdateNotifierService;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public User createUser(User user) {
        // Optional: Add email existence check here if desired
        User createdUser = userRepository.save(user);
        userUpdateNotifierService.notifyUserCreated(createdUser); // Notify WebSocket clients
        return createdUser;
    }

    @Transactional
    public User assignPermissionToUser(Long userId, Long permissionId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new EntityNotFoundException("Permission not found with id: " + permissionId));

        user.addPermission(permission);
        User updatedUser = userRepository.save(user);
        userUpdateNotifierService.notifyUserUpdated(updatedUser); // Notify WebSocket clients
        return updatedUser;
    }

    @Transactional
    public User removePermissionFromUser(Long userId, Long permissionId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new EntityNotFoundException("Permission not found with id: " + permissionId));

        user.removePermission(permission);
        User updatedUser = userRepository.save(user);
        userUpdateNotifierService.notifyUserUpdated(updatedUser); // Notify WebSocket clients
        // If we had a specific "permissions_updated" type message, we could send that.
        // For now, sending the whole user object is fine.
        return updatedUser;
    }

    // Placeholder for deleteUser method integration
    // public void deleteUser(Long userId) {
    //     userRepository.deleteById(userId);
    //     userUpdateNotifierService.notifyUserDeleted(userId);
    // }
}
