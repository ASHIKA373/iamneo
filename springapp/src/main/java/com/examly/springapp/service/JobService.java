package com.examly.springapp.service;

import com.examly.springapp.model.Job;
import com.examly.springapp.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public List<Job> searchJobs(String keyword) {
        return jobRepository.searchByKeyword(keyword);
    }

    public Job updateJob(Long id, Job jobDetails) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));

        job.setTitle(jobDetails.getTitle());
        job.setCompany(jobDetails.getCompany());
        job.setLocation(jobDetails.getLocation());
        job.setType(jobDetails.getType());
        job.setPostedDate(jobDetails.getPostedDate());
        job.setDescription(jobDetails.getDescription());
        job.setSkills(jobDetails.getSkills());
        job.setSalaryRange(jobDetails.getSalaryRange());
        job.setApplicationDeadline(jobDetails.getApplicationDeadline());

        return jobRepository.save(job);
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
