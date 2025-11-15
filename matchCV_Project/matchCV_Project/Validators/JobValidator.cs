using FluentValidation;
using matchCV_Project.Models;

namespace matchCV_Project.Validators;

public class JobValidator : AbstractValidator<Job>
{
    public JobValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(200);

        RuleFor(x => x.Company)
            .NotEmpty().WithMessage("Company is required.")
            .MaximumLength(150);

        RuleFor(x => x.RawText)
            .NotEmpty().WithMessage("Job description is required.");
    }
}
