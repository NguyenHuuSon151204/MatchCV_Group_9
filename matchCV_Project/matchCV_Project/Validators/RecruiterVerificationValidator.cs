using FluentValidation;

namespace matchCV_Project.Validators;

public class SubmitVerificationRequestValidator : AbstractValidator<SubmitVerificationRequest>
{
    public SubmitVerificationRequestValidator()
    {
        RuleFor(x => x.CompanyName)
            .NotEmpty().WithMessage("Company name is required.")
            .MaximumLength(200).WithMessage("Company name must not exceed 200 characters.");

        RuleFor(x => x.CompanyEmail)
            .NotEmpty().WithMessage("Company email is required.")
            .EmailAddress().WithMessage("Invalid email format.")
            .MaximumLength(250).WithMessage("Email must not exceed 250 characters.");

        RuleFor(x => x.CompanyPhone)
            .MaximumLength(50).WithMessage("Phone number must not exceed 50 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.CompanyPhone));

        RuleFor(x => x.CompanyAddress)
            .MaximumLength(200).WithMessage("Address must not exceed 200 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.CompanyAddress));

        RuleFor(x => x.TaxCode)
            .MaximumLength(50).WithMessage("Tax code must not exceed 50 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.TaxCode));
    }
}

public class UpdateVerificationStatusRequestValidator : AbstractValidator<UpdateVerificationStatusRequest>
{
    public UpdateVerificationStatusRequestValidator()
    {
        RuleFor(x => x.Status)
            .NotEmpty().WithMessage("Status is required.")
            .Must(s => s == "Approved" || s == "Rejected" || s == "Pending")
            .WithMessage("Status must be 'Approved', 'Rejected', or 'Pending'.");

        RuleFor(x => x.AdminNotes)
            .MaximumLength(500).WithMessage("Admin notes must not exceed 500 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.AdminNotes));
    }
}

// DTOs for validation
public record SubmitVerificationRequest(
    string CompanyName,
    string CompanyEmail,
    string? CompanyPhone,
    string? CompanyAddress,
    string? TaxCode
);

public record UpdateVerificationStatusRequest(
    string Status,
    string? AdminNotes
);

