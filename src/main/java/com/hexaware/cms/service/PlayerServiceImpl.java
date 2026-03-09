package com.hexaware.cms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cms.dto.RequestDTO;
import com.hexaware.cms.dto.ResponseDTO;
import com.hexaware.cms.entity.Player;
import com.hexaware.cms.exception.PlayerNotFoundException;
import com.hexaware.cms.repo.PlayerRepo;

@Service
public class PlayerServiceImpl implements IPlayerService{
	
	public Player changeToEntity(RequestDTO dto) {
		Player player = new Player();
		player.setPlayerId(dto.getPlayerId());
		player.setPlayerName(dto.getPlayerName());
		player.setRole(dto.getRole());
		player.setTeamName(dto.getTeamName());
		player.setCountry(dto.getCountry());
		player.setDescription(dto.getDescription());
		player.setJerseyNumber(dto.getJerseyNumber());
		player.setTotalMatches(dto.getTotalMatches());
		return player;
		
	}
	
	public ResponseDTO changeToDTO(Player player) {
		ResponseDTO dto = new ResponseDTO();
		dto.setPlayerId(player.getPlayerId());
		dto.setPlayerName(player.getPlayerName());
		dto.setRole(player.getRole());
		dto.setTeamName(player.getTeamName());
		dto.setCountry(player.getCountry());
		dto.setDescription(player.getDescription());
		dto.setJerseyNumber(player.getJerseyNumber());
		dto.setTotalMatches(player.getTotalMatches());
		return dto;
	}
	
	@Autowired
	PlayerRepo repo;

	@Override
	public List<ResponseDTO> getAllPlayers() {
		// TODO Auto-generated method stub
		return repo.findAll().stream().map(this::changeToDTO).collect(Collectors.toList());
	}

	@Override
	public ResponseDTO getPlayerById(int id) {
		// TODO Auto-generated method stub
		Player player = repo.findById(id)
	            .orElseThrow(() -> new PlayerNotFoundException("Player not found"));

	    return changeToDTO(player);
	}

	@Override
	public ResponseDTO addPlayer(RequestDTO dto) {
		// TODO Auto-generated method stub
		Player player = changeToEntity(dto);
		Player saved = repo.save(player);
		return changeToDTO(saved);
	}

	@Override
	public ResponseDTO updatePlayer(int id, RequestDTO dto) {
		// TODO Auto-generated method stub
		Player player = repo.findById(id).orElseThrow(() -> new PlayerNotFoundException("Player not found"));;
		
			player = changeToEntity(dto);
			
			Player saved = repo.save(player);
			return changeToDTO(saved);
			
	}

	@Override
	public void deletePlayer(int id) {
		// TODO Auto-generated method stub
		repo.deleteById(id);
	}

	

}
