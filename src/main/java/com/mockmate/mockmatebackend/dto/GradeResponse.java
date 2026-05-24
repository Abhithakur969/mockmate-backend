package com.mockmate.mockmatebackend.dto;

import lombok.Data;

@Data
public class GradeResponse {
    private int score;
    private String verdict;
    private String strengths;
    private String improvements;
    private String betterAnswer;

    // Constructor
    public GradeResponse() {}

    public GradeResponse(int score, String verdict, String strengths,
                         String improvements, String betterAnswer) {
        this.score = score;
        this.verdict = verdict;
        this.strengths = strengths;
        this.improvements = improvements;
        this.betterAnswer = betterAnswer;
    }

    // Getters and Setters
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public String getVerdict() { return verdict; }
    public void setVerdict(String verdict) { this.verdict = verdict; }

    public String getStrengths() { return strengths; }
    public void setStrengths(String strengths) { this.strengths = strengths; }

    public String getImprovements() { return improvements; }
    public void setImprovements(String improvements) { this.improvements = improvements; }

    public String getBetterAnswer() { return betterAnswer; }
    public void setBetterAnswer(String betterAnswer) { this.betterAnswer = betterAnswer; }
}
