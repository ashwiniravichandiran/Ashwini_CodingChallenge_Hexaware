package com.hexaware.cms.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestDTO {
	@NotNull(message="Player ID cannot be null")
    private Integer playerId;

    @NotBlank(message="Player name cannot be empty")
    private String playerName;

    @Min(value=1, message="Jersey number must be positive")
    private int jerseyNumber;

    @NotBlank(message="Role is required")
    @Pattern(
        regexp = "Batsman|Bowler|Keeper|All Rounder",
        message = "Role must be Batsman, Bowler, Keeper, or All Rounder"
    )
    private String role;

    @Min(value=0, message="Total matches cannot be negative")
    private int totalMatches;

    private String teamName;
    private String country;
    private String description;
}
