return {
	"williamboman/mason.nvim",
	config = function()
		require("mason").setup({
			log_level = vim.log.levels.WARN,
			ui = {
				icons = {
					package_installed = "✓",
					package_pending = "➜",
					package_uninstalled = "✗",
				},
			},
			pip = {
				upgrade_pip = false,
				install_args = { "-i", "https://pypi.tuna.tsinghua.edu.cn/simple" },
			},
		})
	end,
}
