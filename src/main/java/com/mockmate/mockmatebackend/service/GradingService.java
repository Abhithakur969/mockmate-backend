package com.mockmate.mockmatebackend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mockmate.mockmatebackend.client.GeminiClient;
import com.mockmate.mockmatebackend.dto.GradeRequest;
import com.mockmate.mockmatebackend.dto.GradeResponse;
import org.springframework.stereotype.Service;

@Service
public class GradingService {

    private final GeminiClient gemini;
    private final ObjectMapper mapper = new ObjectMapper();

    public GradingService(GeminiClient gemini) {
        this.gemini = gemini;
    }

    public GradeResponse grade(GradeRequest req) throws Exception {
        // Enforce strong persona and structured constraints
        String prompt = """
            You are a friendly but honest tech interviewer conducting a mock interview on MockMate.
            Target Role: %s
            Interview Question: %s
            Candidate Answer: %s

            Evaluate this answer strictly for a fresher level (0-1 years experience).
            Provide your response matching this exact JSON format structural blueprint:
            {
              "score": <Integer from 1-10, max 8 for freshers>,
              "verdict": "<PASS | NEEDS WORK | FAIL>",
              "strengths": "One constructive sentence highlighting what was technically accurate.",
              "improvements": "One action-oriented sentence detailing missing key concepts or keywords.",
              "betterAnswer": "A short, complete 2-sentence reference answer optimized for an entry-level candidate."
            }

            Grading Rubric Rules:
            - Assign PASS for scores 6-8, BREAKDOWN / NEEDS WORK for 4-5, FAIL for 1-3.
            - If the candidate's response is blank, extremely brief, or completely irrelevant, assign a score of 1-3.
            - Do not include any text outside of the raw JSON object structure.
            """.formatted(req.getRole(), req.getQuestion(), req.getAnswer());

        String raw = gemini.generate(prompt);

        // Strip out any accidental markdown wrapper artifacts if they appear
        String clean = raw.replaceAll("```json|```", "").trim();

        return mapper.readValue(clean, GradeResponse.class);
    }
}