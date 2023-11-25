return {
	"stevearc/conform.nvim",
	opts = {},
	config = function()
		require("conform").setup({
			format_on_save = {
				timeout_ms = 3000,
				lsp_fallback = true,
			},
			formatters_by_ft = {
				lua = { "stylua" },
				python = { "isort", "black" },
				go = { "goimports", "gofmt" },
				javascript = { "prettier" },
				typescript = { "prettier" },
				typescriptreact = { "prettier" },
				javascriptreact = { "prettier" },
			},
			formatters = {
				prettier = {
					args = function(ctx)
						if vim.endswith(ctx.filename, ".tsx") or vim.endswith(ctx.filename, ".ts") then
							return { "--stdin-filepath", "$FILENAME", "--parser", "typescript", "--tab-width", "2" }
						elseif vim.endswith(ctx.filename, ".jsx") or vim.endswith(ctx.filename, ".js") then
							return { "--stdin-filepath", "$FILENAME", "--parser", "javascript", "--tab-width", "2" }
						end
						return { "--stdin-filepath", "$FILENAME" }
					end,
				},
			},
		})
	end,
}
