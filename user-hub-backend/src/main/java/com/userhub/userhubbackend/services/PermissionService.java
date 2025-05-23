package com.userhub.userhubbackend.services;

import com.userhub.userhubbackend.entities.Permission;
import com.userhub.userhubbackend.repositories.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PermissionService {

    private final PermissionRepository permissionRepository;

    @Autowired
    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public List<Permission> getAllPermissions() {
        return permissionRepository.findAll();
    }

    public Permission createPermission(Permission permission) {
        // Optional: Check if permission name already exists
        Optional<Permission> existingPermission = permissionRepository.findByName(permission.getName());
        if (existingPermission.isPresent()) {
            // Handle duplicate permission name, e.g., throw an exception or return the existing one
            // For now, let's assume we want to prevent duplicates by throwing an exception
            throw new IllegalArgumentException("Permission with name '" + permission.getName() + "' already exists.");
        }
        return permissionRepository.save(permission);
    }
}
