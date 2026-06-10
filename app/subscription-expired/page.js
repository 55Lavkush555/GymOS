import { AlertTriangle, MessageCircle } from "lucide-react";

export default function SubscriptionExpiredPage() {
	return (
		<div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4 py-10 sm:py-14">
			<div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-amber-500/10 via-transparent to-indigo-500/10" />

			<div className="relative w-full max-w-2xl">
				<div className="bg-[var(--card)]/95 backdrop-blur-md border border-[var(--border)] rounded-3xl shadow-2xl shadow-black/5 overflow-hidden">
					<div className="h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />

					<div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 text-center">
						<div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
							<AlertTriangle size={42} className="sm:hidden" />
							<AlertTriangle size={48} className="hidden sm:block" />
						</div>

						<div className="mt-6 sm:mt-7 space-y-3">
							<span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20">
								Subscription expired
							</span>
							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]">
								Your GymOS subscription has expired.
							</h1>
							<p className="text-sm sm:text-base lg:text-lg leading-7 text-[var(--muted-foreground)] max-w-2xl mx-auto">
								To continue using member management, attendance tracking,
								analytics, and other GymOS features, please renew your
								subscription. Access to dashboard features has been restricted
								because the subscription is no longer active.
							</p>
						</div>

						<div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 text-left sm:grid-cols-2">
							<div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/60 p-4 sm:p-5">
								<p className="text-sm font-semibold text-[var(--foreground)]">
									What this means
								</p>
								<p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
									Dashboard access is restricted until the subscription is
									renewed. Your account data remains safe and ready once the
									plan is active again.
								</p>
							</div>

							<div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/60 p-4 sm:p-5">
								<p className="text-sm font-semibold text-[var(--foreground)]">
									Renewal assistance
								</p>
								<p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
									For renewal help, contact our support team on WhatsApp.
									We&apos;ll guide you through the next steps quickly.
								</p>
							</div>
						</div>

						<div className="mt-8 sm:mt-10 rounded-3xl border border-[var(--border)] bg-[var(--secondary)]/70 p-5 sm:p-6 lg:p-7">
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
								WhatsApp contact
							</p>
							<div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
								<div>
									<p className="text-lg sm:text-xl font-semibold text-[var(--foreground)]">
										+91 62691 21509
									</p>
									<p className="text-sm text-[var(--muted-foreground)] mt-1">
										Reach out for renewal assistance or account support.
									</p>
								</div>

								<a
									href="https://wa.me/916269121509"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:brightness-95 transition-colors shadow-sm shadow-green-500/20 min-w-53.75"
								>
									<MessageCircle size={18} />
									Contact on WhatsApp
								</a>
							</div>
						</div>

						<p className="mt-7 text-xs sm:text-sm text-[var(--muted-foreground)]">
							Your GymOS experience will be restored as soon as the subscription
							is renewed.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
