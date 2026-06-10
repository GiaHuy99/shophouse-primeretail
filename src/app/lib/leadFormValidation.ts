export type LeadFieldErrors = {
  name?: string;
  phone?: string;
};

export function normalizePhone(input: string): string {
  return input.replace(/\D/g, "");
}

export function validateLeadName(name: string): string | undefined {
  if (!name.trim()) {
    return "Vui lòng nhập họ và tên.";
  }
  return undefined;
}

export function validateLeadPhone(phone: string): string | undefined {
  const digits = normalizePhone(phone);
  if (digits.length === 0) {
    return "Vui lòng nhập số điện thoại.";
  }
  if (digits.length !== 10) {
    return "Số điện thoại phải đúng 10 chữ số.";
  }
  return undefined;
}

export function validateLeadContact(name: string, phone: string): LeadFieldErrors {
  const errors: LeadFieldErrors = {};
  const nameError = validateLeadName(name);
  const phoneError = validateLeadPhone(phone);
  if (nameError) errors.name = nameError;
  if (phoneError) errors.phone = phoneError;
  return errors;
}
