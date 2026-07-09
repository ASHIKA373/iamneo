package com.examly.springapp.config;

import com.examly.springapp.model.Job;
import com.examly.springapp.repository.JobRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private JobRepository jobRepository;

    @Override
    public void run(String... args) {
        if (jobRepository.count() == 0) {
            Job job1 = new Job(null, "Frontend Developer", "Tech Solutions Inc.", "New York, NY", "Full-time",
                    "2023-10-15", "We are looking for a skilled Frontend Developer to join our team.",
                    Arrays.asList("React", "JavaScript", "HTML", "CSS"), "$80,000 - $100,000", "2023-11-15");

            Job job2 = new Job(null, "Backend Developer", "CodeCraft Systems", "Austin, TX", "Full-time",
                    "2023-10-18", "Seeking an experienced Backend Developer to build robust APIs.",
                    Arrays.asList("Java", "Spring Boot", "MySQL", "REST APIs"), "$90,000 - $110,000", "2023-11-20");

            Job job3 = new Job(null, "UI/UX Designer", "Creative Minds Studio", "San Francisco, CA", "Contract",
                    "2023-10-20", "Looking for a creative UI/UX Designer to craft delightful user experiences.",
                    Arrays.asList("Figma", "Sketch", "Adobe XD", "Prototyping"), "$70,000 - $90,000", "2023-11-25");

            Job job4 = new Job(null, "Data Analyst", "Insight Analytics", "Chicago, IL", "Full-time",
                    "2023-10-22", "Join our team to analyze large datasets and derive actionable insights.",
                    Arrays.asList("SQL", "Python", "Tableau", "Excel"), "$65,000 - $85,000", "2023-11-28");

            Job job5 = new Job(null, "DevOps Engineer", "CloudNine Technologies", "Remote", "Full-time",
                    "2023-10-25", "We need a DevOps Engineer to manage CI/CD pipelines and cloud infrastructure.",
                    Arrays.asList("AWS", "Docker", "Kubernetes", "Jenkins"), "$100,000 - $130,000", "2023-12-01");

            Job job6 = new Job(null, "Product Manager", "NextGen Products", "Seattle, WA", "Full-time",
                    "2023-10-27", "Looking for a Product Manager to drive product strategy and roadmap.",
                    Arrays.asList("Agile", "Scrum", "Roadmapping", "Stakeholder Management"),
                    "$95,000 - $120,000", "2023-12-05");

            jobRepository.saveAll(Arrays.asList(job1, job2, job3, job4, job5, job6));
        }
    }
}
