import Payment from "./events/payment.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subjects/paymentSubject.js";

const paymentSubject = new PaymentSubject();
const marketing = new Marketing();
const shipment = new Shipment();

paymentSubject.subscribe(marketing);
paymentSubject.subscribe(shipment);

const payment = new Payment(paymentSubject);
payment.creditCard({ userName: 'yvesguilherme', id: Date.now() });

paymentSubject.unsubscribe(marketing);

payment.creditCard({ userName: 'gabi', id: Date.now() });