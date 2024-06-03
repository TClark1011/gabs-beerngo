import { reviewShareModalIsOpenAtom } from "@/stores";
import { CopyIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useClipboard,
	useToast,
} from "@chakra-ui/react";
import { useLinkProps, useSearch } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { FC } from "react";

export const ReviewShareModal: FC = () => {
	const [isOpen, setIsOpen] = useAtom(reviewShareModalIsOpenAtom);
	const { data } = useSearch({
		from: "/reviews",
	});
	const reviewShareLinkProps = useLinkProps({
		to: "/reviews",
		search: {
			data,
			share: true,
		},
	});

	const shareUrl = `${window.location.origin}${reviewShareLinkProps.href}`;

	const clipboard = useClipboard(shareUrl);
	const toast = useToast();

	return (
		<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Share Your Reviews</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Box bg="blackAlpha.400" p="4" rounded="lg" overflow="hidden">
						<Text fontFamily="mono" whiteSpace="nowrap" overflow="auto">
							{shareUrl}
						</Text>
					</Box>
					<Box h="4" />
					<Stack>
						<Button
							width="full"
							colorScheme="blue"
							leftIcon={<CopyIcon />}
							onClick={() => {
								clipboard.onCopy();
								toast({
									title: "Copied!",
									status: "success",
								});
							}}
							isDisabled={clipboard.hasCopied}
						>
							Copy
						</Button>
						<Button width="full" onClick={() => setIsOpen(false)}>
							Close
						</Button>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
