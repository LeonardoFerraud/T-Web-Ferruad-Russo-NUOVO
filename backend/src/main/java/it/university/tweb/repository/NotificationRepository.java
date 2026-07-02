package it.university.tweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.university.tweb.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {}
