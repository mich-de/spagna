const zoneDriveTimes: Record<string, Record<string, number>> = {
  "San Pedro de Alcántara": {
    san_pedro: 5,
    marbella: 12,
    puerto_banus: 8,
    cabopino: 22,
    estepona: 15,
    mijas_pueblo: 35,
    fuengirola: 32,
    torremolinos: 45,
    benalmadena: 45,
    malaga: 60,
    nerja: 110
  },
  "Marbella (Centro/Casco Antiguo)": {
    san_pedro: 12,
    marbella: 5,
    puerto_banus: 10,
    cabopino: 15,
    estepona: 25,
    mijas_pueblo: 20,
    fuengirola: 22,
    torremolinos: 35,
    benalmadena: 40,
    malaga: 50,
    nerja: 100
  },
  "Estepona": {
    san_pedro: 15,
    marbella: 25,
    puerto_banus: 20,
    cabopino: 35,
    estepona: 5,
    mijas_pueblo: 50,
    fuengirola: 47,
    torremolinos: 60,
    benalmadena: 65,
    malaga: 85,
    nerja: 125
  },
  "Benalmádena": {
    san_pedro: 45,
    marbella: 40,
    puerto_banus: 42,
    cabopino: 25,
    estepona: 65,
    mijas_pueblo: 10,
    fuengirola: 15,
    torremolinos: 10,
    benalmadena: 5,
    malaga: 20,
    nerja: 70
  },
  "Nerja": {
    san_pedro: 110,
    marbella: 100,
    puerto_banus: 105,
    cabopino: 85,
    estepona: 125,
    mijas_pueblo: 60,
    fuengirola: 65,
    torremolinos: 55,
    benalmadena: 50,
    malaga: 50,
    nerja: 5
  }
};

export function getShortBaseName(name: string): string {
  if (!name) return 'San Pedro';
  if (name.includes('San Pedro')) return 'San Pedro';
  if (name.includes('Marbella')) return 'Marbella';
  return name;
}

export function getZoneKey(zone: string): string {
  if (!zone) return 'san_pedro';
  const z = zone.toLowerCase();
  if (z.includes('nerja') || z.includes('maro')) return 'nerja';
  if (z.includes('san pedro')) return 'san_pedro';
  if (z.includes('estepona')) return 'estepona';
  if (z.includes('banús') || z.includes('banus')) return 'puerto_banus';
  if (z.includes('cabopino')) return 'cabopino';
  if (z.includes('marbella') || z.includes('golden mile')) return 'marbella';
  if (z.includes('mijas')) return 'mijas_pueblo';
  if (z.includes('fuengirola')) return 'fuengirola';
  if (z.includes('torremolinos') || z.includes('carihuela')) return 'torremolinos';
  if (z.includes('benalmádena') || z.includes('benalmadena') || z.includes('marina')) return 'benalmadena';
  if (z.includes('málaga') || z.includes('malaga') || z.includes('pimpi') || z.includes('lola')) return 'malaga';
  return 'san_pedro'; // default fallback
}

export function getDriveTime(selectedBase: string, zone: string): number {
  const base = selectedBase || "San Pedro de Alcántara";
  const zoneKey = getZoneKey(zone);
  const baseTimes = zoneDriveTimes[base] || zoneDriveTimes["San Pedro de Alcántara"];
  return baseTimes[zoneKey] !== undefined ? baseTimes[zoneKey] : 0;
}
