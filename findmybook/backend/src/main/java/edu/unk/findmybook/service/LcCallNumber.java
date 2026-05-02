package edu.unk.findmybook.service;

public class LcCallNumber {

    private String classLetters;
    private Double classNumber;

    private String cutter1Letters;
    private String cutter1RawNumber;

    private String cutter2Letters;
    private String cutter2RawNumber;

    private Integer year;

    public LcCallNumber() {
    }

    public LcCallNumber(String classLetters, Double classNumber, String cutter1Letters, String cutter1RawNumber,
        String cutter2Letters, String cutter2RawNumber, Integer year) {
        this.classLetters = classLetters;
        this.classNumber = classNumber;
        this.cutter1Letters = cutter1Letters;
        this.cutter1RawNumber = cutter1RawNumber;
        this.cutter2Letters = cutter2Letters;
        this.cutter2RawNumber = cutter2RawNumber;
        this.year = year;
    }

    public String getClassLetters() {
        return classLetters;
    }

    public void setClassLetters(String classLetters) {
        this.classLetters = classLetters;
    }

    public Double getClassNumber() {
        return classNumber;
    }

    public void setClassNumber(Double classNumber) {
        this.classNumber = classNumber;
    }

    public String getCutter1Letters() {
        return cutter1Letters;
    }

    public void setCutter1Letters(String cutter1Letters) {
        this.cutter1Letters = cutter1Letters;
    }

    public String getCutter1RawNumber() {
        return cutter1RawNumber;
    }

    public void setCutter1RawNumber(String cutter1RawNumber) {
        this.cutter1RawNumber = cutter1RawNumber;
    }

    public String getCutter2Letters() {
        return cutter2Letters;
    }

    public void setCutter2Letters(String cutter2Letters) {
        this.cutter2Letters = cutter2Letters;
    }

    public String getCutter2RawNumber() {
        return cutter2RawNumber;
    }

    public void setCutter2RawNumber(String cutter2RawNumber) {
        this.cutter2RawNumber = cutter2RawNumber;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}