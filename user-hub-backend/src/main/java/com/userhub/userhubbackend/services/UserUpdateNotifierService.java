package com.userhub.userhubbackend.services;

import com.userhub.userhubbackend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserUpdateNotifierService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public UserUpdateNotifierService(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    public void notifyUserCreated(User user) {
        // Send the created user object to the "/topic/users" destination
        // Spring will automatically convert the User object to JSON
        simpMessagingTemplate.convertAndSend("/topic/users", user);
    }

    // Placeholder for future methods
    public void notifyUserUpdated(User user) {
        // Example: simpMessagingTemplate.convertAndSend("/topic/users/updated", user);
        // Or, more commonly, send to the same topic with a different message structure or rely on client to diff
        simpMessagingTemplate.convertAndSend("/topic/users", user); // Sending updated user to the same topic
    }

    public void notifyUserDeleted(Long userId) {
        // Example: simpMessagingTemplate.convertAndSend("/topic/users/deleted", userId);
        // Or send a structured message:
        // Map<String, Object> message = new HashMap<>();
        // message.put("action", "DELETED");
        // message.put("userId", userId);
        // simpMessagingTemplate.convertAndSend("/topic/users", message);
        simpMessagingTemplate.convertAndSend("/topic/users", "{\"action\": \"DELETED\", \"userId\": " + userId + "}"); // Sending a custom JSON string
    }
}
