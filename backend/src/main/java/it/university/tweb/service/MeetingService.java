package it.university.tweb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import it.university.tweb.model.Meeting;
import it.university.tweb.repository.MeetingRepository;

@Service
public class MeetingService {
    private final MeetingRepository meetingRepository;

    public MeetingService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    public List<Meeting> findAll() {
        return meetingRepository.findAll();
    }

    public Meeting save(Meeting meeting) {
        return meetingRepository.save(meeting);
    }
}
