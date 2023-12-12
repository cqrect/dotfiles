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
				rust = { "rustfmt" },
				javascript = { { "prettier", "tsserver" } },
				typescript = { { "prettier", "tsserver" } },
				typescriptreact = { { "prettier", "tsserver" } },
				javascriptreact = { { "prettier", "tsserver" } },
				json = { "prettier" },
				css = { "prettier" },
				html = { "prettier" },
			},
			formatters = {
				prettier = {
					args = function(ctx)
						if vim.endswith(ctx.filename, ".tsx") or vim.endswith(ctx.filename, ".ts") then
							return { "--stdin-filepath", "$FILENAME", "--parser", "typescript", "--tab-width", "2" }
						elseif vim.endswith(ctx.filename, ".jsx") or vim.endswith(ctx.filename, ".js") then
							return { "--stdin-filepath", "$FILENAME", "--tab-width", "2" }
						elseif vim.endswith(ctx.filename, ".json") then
							return { "--stdin-filepath", "$FILENAME", "--parser", "json" }
						elseif vim.endswith(ctx.filename, ".html") then
							return { "--stdin-filepath", "$FILENAME", "--parser", "html" }
						elseif vim.endswith(ctx.filename, ".css") then
							return { "--stdin-filepath", "$FILENAME", "--parser", "css" }
						end
						return { "--stdin-filepath", "$FILENAME" }
					end,
				},
			},
		})
	end,
}
