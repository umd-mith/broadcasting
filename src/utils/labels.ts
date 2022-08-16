interface Radio {
  [key: string]: {
    full: string,
    altshort?: string
  }
}

export const radiomap: Radio = {
  "KUOM": {
    "full": "University of Minnesota",
    "altshort": "WLB/KUOM"
  },
  "NAEB": {
    "full": "National Association of Educational Broadcasters"
  },
  "NFCB": {
    "full": "National Federation of Community Broadcasters"
  },
  "WHA": {
    "full": "Wisconsin Public Radio"
  }
}