package com.hexaware.cms.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestDTO {
	private int playerId;
    private String playerName;
    private int jerseyNumber;
    private String role;
    private int totalMatches;
    private String teamName;
    private String country;
    private String description;
}
