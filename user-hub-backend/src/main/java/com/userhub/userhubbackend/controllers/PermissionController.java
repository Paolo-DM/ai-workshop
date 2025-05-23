package com.userhub.userhubbackend.controllers;

import com.userhub.userhubbackend.entities.Permission;
import com.userhub.userhubbackend.services.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permissions")
public class PermissionController {

    private final PermissionService permissionService;

    @Autowired
    public PermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping("/")
    public List<Permission> getAllPermissions() {
        return permissionService.getAllPermissions();
    }

    @PostMapping("/")
    public ResponseEntity<Permission> createPermission(@RequestBody Permission permission) {
        try {
            Permission createdPermission = permissionService.createPermission(permission);
            return new ResponseEntity<>(createdPermission, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Handle the case where permission name already exists
            // Returning a 409 Conflict status
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
    }
}
