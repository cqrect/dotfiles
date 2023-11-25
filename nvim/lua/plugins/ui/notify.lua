return {
	"rcarriga/nvim-notify",
	config = function()
		local notify = require("notify")
		require("notify").setup({
			background_colour = "#000000",
			timeout = 3000,
			level = vim.log.levels.WARN,
		})
		vim.keymap.set("n", "<leader>q", function()
			notify.dismiss()
		end, { silent = true })
	end,
}
