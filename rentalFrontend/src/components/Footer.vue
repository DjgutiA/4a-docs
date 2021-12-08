<template>
  <div class="footer">
    <div class="footer-info-section">
      <div>
        <label class="section-title six-title">Six Rental</label>
        <p>
          Moving to a world where the opportunities to grow become familiar to
          everyone
        </p>
      </div>
      <div>
        <label class="section-title">Información</label>
        <p>Sobre nosotros</p>
        <p>Servicios</p>
        <p>Términos y condiciones</p>
        <p>Mejor precio garantizado</p>
        <p>Políticas de privacidad</p>
      </div>
      <div>
        <label class="section-title">Servicio al cliente</label>
        <p>FAQ</p>
        <p>Opciones de pago</p>
        <p>Tips para reservar</p>
        <p>Cómo funciona</p>
        <p>Contáctanos</p>
      </div>
      <div>
        <label class="section-title">¿Tienes alguna pregunta?</label>
        <p>info@sixrental.com</p>
        <p>+2 392 3929 210</p>
      </div>
    </div>

    <p class="copyright-advice">
      Copyright ©2021 Todos los derechos reservados | Realizado por: equipo 6,
      grupo P10, Mision TIC
    </p>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  height: 450px;
  background-color: var(--dark-blue-color);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-info-section {
  padding-top: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 95%;
  width: 90%;
}

.footer-info-section div {
  height: 100%;
  width: 25%;
}

.copyright-advice,
.footer-info-section p {
  font-size: 35%;
  color: var(--white-color);
  cursor: pointer;
  opacity: 85%;
}

.copyright-advice {
  margin: 1% 0 5% 0;
  font-weight: 500;
}

.section-title {
  font-size: 40%;
  color: var(--white-color);
  font-weight: 600;
  width: 100%;
}

.six-title {
  font-family: "Cutive Mono", monospace;
  font-weight: 400;
  font-size: 55%;
}
</style>