import { Invoice } from './invoice.entity';

describe('InvoiceEntity', () => {
  it('should be defined', () => {
    expect(new Invoice()).toBeDefined();
  });
});
