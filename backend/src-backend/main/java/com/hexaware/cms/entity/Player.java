package com.hexaware.cms.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@Entity
@ToString
public class Player {
	@Id
	@Column(unique = true)
	private int playerId;
    private String playerName;
    @Column(unique = true)
    private int jerseyNumber;
    private String role;
    private int totalMatches;
    private String teamName;
    private String country;
    private String description;
}
