/**
 * Gerencia os eventos, notificando todas as pessoas inscritas no projeto.
 */
export default class PaymentSubject {
  #observers = new Set();

  notify(data) {
    this.#observers.forEach(observer => observer.update(data));
  }

  subscribe(observable) {
    this.#observers.add(observable);
  }

  unsubscribe(observable) {
    this.#observers.delete(observable);
  }
}