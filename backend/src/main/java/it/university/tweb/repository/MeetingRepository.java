package it.university.tweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.university.tweb.model.Meeting;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {}
