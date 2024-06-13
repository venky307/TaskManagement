package com.cat.main.example.taskmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cat.main.example.taskmanagement.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
