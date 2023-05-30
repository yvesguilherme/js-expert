export default class Shipment {
  update({ id, userName }) {
    /**
     * Importante lembrar que o [update] é responsável por gerenciar seus erros/exceptions.
     * Não se deve ter await no notify, pois a responsabilidade do notify é apenas emitir eventos,
     * notificando todo mundo.
     */
    console.log(`[${id}]: [shipment] will pack the user's order to [${userName}]`);
  }
}