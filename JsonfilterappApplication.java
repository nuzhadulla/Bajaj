package com.example.jsonfilterapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SpringBootApplication
@RestController
@RequestMapping("/filter")
public class JsonFilterApp {

    public static void main(String[] args) {
        SpringApplication.run(JsonFilterApp.class, args);
    }

    @PostMapping
    public Response filterJson(@RequestBody InputData inputData) {
        return new Response(inputData.getData());
    }

    static class InputData {
        private List<String> data;

        public List<String> getData() {
            return data;
        }

        public void setData(List<String> data) {
            this.data = data;
        }
    }

    static class Response {
        private List<String> data;

        public Response(List<String> data) {
            this.data = data;
        }

        public List<String> getData() {
            return data;
        }
    }
}
