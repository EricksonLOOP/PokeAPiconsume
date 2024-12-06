# Documentação ProjetoPokemon
 O ProjetoPokemon foi criado ao viés de realizar o teste técnico da PoliDigital, onde testa sua capacidade com a interação de código em React.
 
  --- Acesse aqui!!!
 **Acesse a página em: https://poke-a-piconsume.vercel.app**

 ## Tecnologias
  As tecnologias foram pensadas visando proporcionar uma melhor experiência ao usuário, sendo assim, um projeto de pokémon, foi pensado trazer algo parecido com um jogo. As tecnologias escolhidas foram:
  - React (Pedido da avaliadora)
  - Tailwind (Para design rápido e facilitar uma resposividade)
  - FramerMotion (Para proporcionar animações aos items HTML)
  - Axios (Para requisições HTTP/HTTPS)
  - TypeScript (Para um desenvolvimento tipo, gosto dele pois é pouco parecido com meu JAVA)

## Design
 O design foi feito a partir do design de cartas do jogo Pokémon Unite, e com o viés de lembram uma Pokedex
 - ### Design Arquitetônico
 -- **Modularidade**: O código foi separado em componentes e pastas, cada uma com responsabilidade clara, para garantir fácil manutenção e escalabilidade.
 -- **TypeScript**: Usado para garantir a segurança de tipos e evitar erros de tempo de execução.
 -- **Componentes Reutilizáveis**: Componentes globais, como telas de erro e de carregamento, são armazenados em 
 -- **global-components** para serem utilizados em diversas partes do projeto.

## Arquitetura
 Para arquitetura, a escolhida foi arquitetura modular, pois se trata de um projeto que pode crescer e isso acaba viabilizando a possibilidade de manutenção de código, permitindo que o ajuste de cada parte do código não acabe atingindo outras tercerizadas. As tecnoligias escolhidas ao objetivo desta arquitetura, tamanho do projeto, tempo de entrega foram:
 - ### Vite
 -- Propõe uma velocidade de desenvolvimento muito maior comparado com React puro e outros Frameworks, também porquê possui suporte nativo a ESModules.
 - ### TailwindCSS
 -- O desing teria que ser feito de forma rápida, para acompanhar o tempo de entrega. Também porquê ele me disponibiliza a capacidade de layouts personalizados resonsivos diretamente do JSX ou TSX (como escolhido)
 - ### Modularidade
 -- Cada componente e tipo de dado separado para uma melhor manutenção futura, sem a necessidade de leitura de grandes códigos para a manutenção de uma única feature, ou quando quiser adicionar uma nova feature.
 - ### Estrutura
  - **src/**: Contém todo o código de desenvolvimento.
  - **global-components/**: Arquivos estáticos como imagens, fontes e sons.
  - **content/**: Componentes globais e mídias reutilizáveis.
  - **interfaces/**: Tipos e interfaces TypeScript, garantindo segurança e clareza no código.
  - **pages/**: Páginas da aplicação e seus componentes específicos.