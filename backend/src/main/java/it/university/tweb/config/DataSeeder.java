package it.university.tweb.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import it.university.tweb.model.Document;
import it.university.tweb.model.Meeting;
import it.university.tweb.model.Milestone;
import it.university.tweb.model.Notification;
import it.university.tweb.model.Project;
import it.university.tweb.model.Task;
import it.university.tweb.model.User;
import it.university.tweb.repository.DocumentRepository;
import it.university.tweb.repository.MeetingRepository;
import it.university.tweb.repository.MilestoneRepository;
import it.university.tweb.repository.NotificationRepository;
import it.university.tweb.repository.ProjectRepository;
import it.university.tweb.repository.TaskRepository;
import it.university.tweb.repository.UserRepository;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner initData(UserRepository userRepository,
                               ProjectRepository projectRepository,
                               TaskRepository taskRepository,
                               MeetingRepository meetingRepository,
                               DocumentRepository documentRepository,
                               MilestoneRepository milestoneRepository,
                               NotificationRepository notificationRepository) {
        return args -> {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword("admin");
            admin.setRole("ADMIN");
            userRepository.save(admin);

            User user = new User();
            user.setUsername("user");
            user.setPassword("user");
            user.setRole("USER");
            userRepository.save(user);

            Project project = new Project();
            project.setTitle("Progetto iniziale");
            project.setStatus("In corso");
            project.setOwner(admin);
            projectRepository.save(project);

            Task task = new Task();
            task.setDescription("Definire architettura");
            task.setProject(project);
            task.setUser(user);
            taskRepository.save(task);

            Meeting meeting = new Meeting();
            meeting.setTitle("Sprint planning");
            meeting.setScheduledFor("2026-07-10");
            meetingRepository.save(meeting);

            Document document = new Document();
            document.setName("Specifica");
            document.setCategory("Tecnico");
            documentRepository.save(document);

            Milestone milestone = new Milestone();
            milestone.setName("Rilascio MVP");
            milestone.setDueDate("2026-07-20");
            milestoneRepository.save(milestone);

            Notification notification = new Notification();
            notification.setMessage("Nuova attività disponibile");
            notificationRepository.save(notification);
        };
    }
}
