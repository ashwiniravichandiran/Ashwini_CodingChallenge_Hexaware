package com.hexaware.cms.service;

import java.util.List;

import com.hexaware.cms.dto.RequestDTO;
import com.hexaware.cms.dto.ResponseDTO;

public interface IPlayerService {
	public List<ResponseDTO> getAllPlayers();
	public ResponseDTO getPlayerById(int id);
	public ResponseDTO addPlayer(RequestDTO dto);
	public ResponseDTO updatePlayer(int id, RequestDTO player);
	public void deletePlayer(int id);
}
