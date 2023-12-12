use serde::Serialize;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
    #[error(transparent)]
    NetworkError(#[from] reqwest::Error),
    #[error(transparent)]
    FileWriteError(#[from] tokio::io::Error),
    #[error(transparent)]
    JsonError(#[from] serde_json::Error),
    #[error("{message}")]
    AuthError { message: String },
    #[error("{message}")]
    RandomError { message: String },
    #[error("{message}")]
    DownloadError { message: String },
}

impl Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}
