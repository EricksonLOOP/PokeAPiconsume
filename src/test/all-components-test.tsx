import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Index from '../content/pages/index';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Index Component', () => {
    beforeEach(() => {
        // Reseta mocks antes de cada teste
        mockedAxios.get.mockReset();
    });

    it('deve renderizar corretamente os elementos principais', () => {
        render(<Index />);

        const searchBar = screen.getByRole('search');
        expect(searchBar).toBeInTheDocument();
        const loadingScreen = screen.getByText(/Carregando/i);
        expect(loadingScreen).toBeInTheDocument();

    });

    it('deve exibir erro quando a requisição falhar', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Erro ao buscar dados'));
        render(<Index />);
        await waitFor(() => {
            const errorAlert = screen.getByText(/Ocorreu um erro/i);
            expect(errorAlert).toBeInTheDocument();
        });
    });

    it('deve exibir os resultados após a pesquisa ser realizada', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { results: [{ name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/1/' }] }
        });

        render(<Index />);
        await waitFor(() => {
            const pokemonName = screen.getByText(/Pikachu/i);
            expect(pokemonName).toBeInTheDocument();
        });
    });

    it('deve permitir selecionar um Pokémon ao clicar na lista', async () => {
        // Simulando a resposta da API com dados de Pokémon
        mockedAxios.get.mockResolvedValueOnce({
            data: { results: [{ name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/1/' }] }
        });

        render(<Index />);

        //Cicando nas listas
        const pokemonItem = await screen.findByText(/Pikachu/i);
        fireEvent.click(pokemonItem);

        //se o Pokémon foi selecionado s
        const pokemonDetails = screen.getByText(/Detalhes do Pokémon/i);
        expect(pokemonDetails).toBeInTheDocument();
    });

    it('deve tocar o áudio ao clicar em um Pokémon', () => {
        render(<Index />);

        const audioMock = jest.spyOn(HTMLAudioElement.prototype, 'play').mockImplementation(() => Promise.resolve());
        const pokemonItem = screen.getByText(/Pikachu/i);
        fireEvent.click(pokemonItem);

        // Verificar se o áudio foi tocado
        expect(audioMock).toHaveBeenCalled();
    });

    it('deve mudar o índice da página ao clicar no botão "Avançar"', () => {
        render(<Index />);
        const nextPageButton = screen.getByText(/Avançar/i);
        fireEvent.click(nextPageButton);
        expect(screen.getByText(/Voltar/i)).toBeInTheDocument();
    });
});
