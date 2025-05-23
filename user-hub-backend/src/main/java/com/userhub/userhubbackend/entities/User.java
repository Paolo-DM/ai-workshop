package com.userhub.userhubbackend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false, of = "id") // Ensure correct behavior in Sets
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_permissions",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    private Set<Permission> permissions = new HashSet<>();

    // Helper methods (optional but good practice)
    public void addPermission(Permission permission) {
        this.permissions.add(permission);
        // For unidirectional, no need to add to permission's user set
    }

    public void removePermission(Permission permission) {
        this.permissions.remove(permission);
        // For unidirectional, no need to remove from permission's user set
    }
}
