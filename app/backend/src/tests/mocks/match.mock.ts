const mockAllMatches = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 4,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
];

const mockOneMatch = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 4,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
};

const mockAllMatchesInProgress = [
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 42,
    "homeTeamId": 6,
    "homeTeamGoals": 1,
    "awayTeamId": 1,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Ferroviária"
    },
    "awayTeam": {
      "teamName": "Avaí/Kindermann"
    }
  },
  {
    "id": 43,
    "homeTeamId": 11,
    "homeTeamGoals": 0,
    "awayTeamId": 10,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Napoli-SC"
    },
    "awayTeam": {
      "teamName": "Minas Brasília"
    }
  },
  {
    "id": 44,
    "homeTeamId": 7,
    "homeTeamGoals": 2,
    "awayTeamId": 15,
    "awayTeamGoals": 2,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Flamengo"
    },
    "awayTeam": {
      "teamName": "São José-SP"
    }
  },
  {
    "id": 45,
    "homeTeamId": 5,
    "homeTeamGoals": 1,
    "awayTeamId": 3,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Cruzeiro"
    },
    "awayTeam": {
      "teamName": "Botafogo"
    }
  },
  {
    "id": 46,
    "homeTeamId": 4,
    "homeTeamGoals": 1,
    "awayTeamId": 12,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Corinthians"
    },
    "awayTeam": {
      "teamName": "Palmeiras"
    }
  },
  {
    "id": 47,
    "homeTeamId": 8,
    "homeTeamGoals": 1,
    "awayTeamId": 14,
    "awayTeamGoals": 2,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Grêmio"
    },
    "awayTeam": {
      "teamName": "Santos"
    }
  },
  {
    "id": 48,
    "homeTeamId": 13,
    "homeTeamGoals": 1,
    "awayTeamId": 2,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Real Brasília"
    },
    "awayTeam": {
      "teamName": "Bahia"
    }
  }
];

const mockAllMatchesNotInProgress = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamId": 9,
    "homeTeamGoals": 1,
    "awayTeamId": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Internacional"
    },
    "awayTeam": {
      "teamName": "Santos"
    }
  },
];

const mockFinishedMatch = {
  "id": 41,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 9,
  "awayTeamGoals": 0,
  "inProgress": true,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Internacional"
  }
};


export {
  mockAllMatches,
  mockOneMatch,
  mockAllMatchesInProgress,
  mockAllMatchesNotInProgress,
}
