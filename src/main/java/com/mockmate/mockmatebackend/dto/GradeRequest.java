package com.mockmate.mockmatebackend.dto;
import lombok.Data;

@Data
public class GradeRequest {
    private String question;
    private String answer;
    private String role;

    // Getters and Setters
    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}