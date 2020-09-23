# aja sovellus (jos ei imagea, suorittaa automaattisesti buildin)
docker-compose up


# Sulkeminen toisella terminaalilla
docker-compose down


# Mikäli haluat muokata containerin tiedostoja luonnin jälkeen lisää docker-composeen
volumes: ['./:/usr/src/app']


# re-build ilman ajoa sillä kertaa
docker-compose build
