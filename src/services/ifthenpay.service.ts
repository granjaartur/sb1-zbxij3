import { config } from '../config/environment';

interface IfThenPayConfig {
  backofficeKey: string;
  antiPhishingKey: string;
  mbEntity: string;
  mbwayKey: string;
}

interface MBPaymentRequest {
  amount: number;
  reference: string;
  description: string;
  email: string;
}

interface MBWayPaymentRequest extends MBPaymentRequest {
  phone: string;
}

interface PaymentResponse {
  success: boolean;
  reference?: string;
  error?: string;
}

export class IfThenPayService {
  private static config: IfThenPayConfig = {
    backofficeKey: config.ifThenPay.backofficeKey,
    antiPhishingKey: config.ifThenPay.antiPhishingKey,
    mbEntity: config.ifThenPay.mbEntity,
    mbwayKey: config.ifThenPay.mbwayKey,
  };

  static async generateMBReference(data: MBPaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch('https://ifthenpay.com/api/multibanco/reference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.backofficeKey}`,
        },
        body: JSON.stringify({
          amount: data.amount,
          reference: data.reference,
          description: data.description,
          email: data.email,
          entity: this.config.mbEntity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate MB reference');
      }

      const result = await response.json();
      return {
        success: true,
        reference: result.reference,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  static async generateMBWayPayment(data: MBWayPaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch('https://ifthenpay.com/api/mbway/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.mbwayKey}`,
        },
        body: JSON.stringify({
          amount: data.amount,
          reference: data.reference,
          description: data.description,
          email: data.email,
          phone: data.phone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate MBWay payment');
      }

      const result = await response.json();
      return {
        success: true,
        reference: result.reference,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  static async validateCallback(data: any): Promise<boolean> {
    const receivedKey = data.anti_phishing_key;
    return receivedKey === this.config.antiPhishingKey;
  }
}