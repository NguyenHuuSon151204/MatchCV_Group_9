using FluentValidation;
using matchCV_Project.Controllers;

namespace matchCV_Project.Validators;

public class ApplyDtoValidator : AbstractValidator<RecruiterController.ApplyDto>
{
    public ApplyDtoValidator()
    {
        RuleFor(x => x.DocumentId)
            .GreaterThan(0).WithMessage("DocumentId must be greater than zero.");

        RuleFor(x => x.CandidateId)
            .GreaterThan(0).WithMessage("CandidateId must be greater than zero.");
    }
}
