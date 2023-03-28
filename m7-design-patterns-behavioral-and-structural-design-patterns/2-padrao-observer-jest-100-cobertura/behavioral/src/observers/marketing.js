export default class Marketing {
  update({ id, userName }) {
    /**
     * Importante lembrar que o [update] é responsável por gerenciar seus erros/exceptions.
     * Não se deve ter await no notify, pois a responsabilidade do notify é apenas emitir eventos,
     * notificando todo mundo.
     */
    console.log(`[${id}]: [marketing] will send a welcome e-mail to [${userName}]`);
  }
}