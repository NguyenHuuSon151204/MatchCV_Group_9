namespace MatchCV_Project.Models.Dtos;

public class BaseResponseDto<T>
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public T Data { get; set; }
    public List<string> Errors { get; set; } = new();

    public static BaseResponseDto<T> SuccessResponse(T data, string message = "Success")
    {
        return new BaseResponseDto<T>
        {
            Success = true,
            Message = message,
            Data = data
        };
    }

    public static BaseResponseDto<T> FailureResponse(string message, List<string>? errors = null)
    {
        return new BaseResponseDto<T>
        {
            Success = false,
            Message = message,
            Errors = errors ?? new List<string>()
        };
    }
}
