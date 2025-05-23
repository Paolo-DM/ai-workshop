package com.userhub.userhubbackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); // Broker for topics clients subscribe to
        registry.setApplicationDestinationPrefixes("/app"); // Prefix for messages from clients to server
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-user-updates") // WebSocket handshake endpoint
            .setAllowedOrigins("*"); // Allow all origins for simplicity. In production, restrict this.
            // Consider adding .withSockJS() for fallback options if SockJS is used on the client.
    }
}
